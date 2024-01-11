<script>
    import { appstate } from "@/stores/appstate";
    import { isaObj } from "@/stores/isa";
    import { Xlsx } from "@fslab/fsspreadsheet";
    import { ARC } from "@nfdi4plants/arctrl";
    import { ArcInvestigation_fromJsonString } from "@nfdi4plants/arctrl/ISA/ISA.Json/Investigation";
    import { toFsWorkbook } from "@nfdi4plants/arctrl/ISA/ISA.Spreadsheet/ArcInvestigation";

    let hostname = '';
    let namespace = '';
    let accessToken = '';

    function handleSubmit() {
        fetch(`${hostname}/api/v4/namespaces?search=${namespace}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN': accessToken
            }
        })
            .then(response => response.json())
            .then(data => {
                transferARC(data[0].id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function transferARC(namespaceId) {
        let json = {
            // @ts-ignore
            "name": $isaObj.title,
            // @ts-ignore
            "description": $isaObj.description,
            // @ts-ignore
            "path": $isaObj.identifier,
            "namespace_id": namespaceId,
            "initialize_with_readme": "false"
        };

        fetch(`${hostname}/api/v4/projects`, {
            headers: {
                "Content-Type": 'application/json',
                "PRIVATE-TOKEN": accessToken
            },
            method: 'POST',
            body: JSON.stringify(json)
        })
        .then(async function(res){ 
            let respJson = await res.json()

            let payload = {
                "branch": 'main',
                "commit_message": 'Initial Commit.',
                "actions": []
            }

            //Copied from toArc() #FIXME: Needs to be refactored!
            const investigation = ArcInvestigation_fromJsonString(JSON.stringify($isaObj, null, 2));
            let fswb = toFsWorkbook(investigation);

            let arc = new ARC(investigation);
            arc.UpdateFileSystem();
            let contracts = arc.GetWriteContracts();
            //End of copy

            for (const contract of contracts) {
                if (contract.DTOType == "ISA_Assay" || contract.DTOType == "ISA_Study" || contract.DTOType == "ISA_Investigation") {
                    let xlsxBytes = await Xlsx.toBytes(contract.DTO);
                    let base64String = btoa(String.fromCharCode.apply(null, xlsxBytes));
                    payload.actions.push({
                        "action": "create",
                        "file_path": contract.Path,
                        "content": base64String,
                        "encoding": "base64"
                    })
                } else if (contract.DTOType == "PlainText") {
                    payload.actions.push({
                        "action": "create",
                        "file_path": contract.Path,
                        "content": contract.DTO,
                        "encoding": "text"
                    })
                } else {
                    console.log("Warning: The given contract is not a correct ARC write contract: ", contract)
                }
            }

                fetch(`${hostname}/api/v4/projects/${respJson.id}/repository/commits`, {
                headers: {
                    "Content-Type": 'application/json',
                    "PRIVATE-TOKEN": accessToken
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then(function(){
                alert('Transfer to Gitlab successful!')
                $appstate = appstate.FORM;
            })
            .catch(function(res){console.log(res)})
        })
        .catch(function(res){ console.log(res)})
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <label for="hostname">GitLab Hostname:</label>
    <input type="text" id="hostname" bind:value={hostname} required>

    <label for="namespace">Namespace:</label>
    <input type="text" id="namespace" bind:value={namespace} required>

    <label for="accessToken">Personal Access Token:</label>
    <input type="password" id="accessToken" bind:value={accessToken} required>

    <button style="background-color: grey" on:click={()=>{$appstate=appstate.FORM}}>Cancel</button>
    <button class="add" style="float: right" type="submit">Start Transfer</button>
</form>


<style>
    form {
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f5f5f5;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>