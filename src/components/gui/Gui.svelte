<script>
    import { base_url, gitlab_repsonse } from "@/stores/gitlab-api";
    import Investigation from "./Investigation.svelte";
    import { isaObj } from "@/stores/isa";    
    import { ArcInvestigation_fromJsonString } from "@nfdi4plants/arctrl/ISA/ISA.Json/Investigation";
    import { ARC } from "@nfdi4plants/arctrl";
    import { Xlsx } from "@fslab/fsspreadsheet";
    import { DataFrame } from "dataframe-js";

    function publish() {
        console.log("Publishing on DataHub");
        // @ts-ignore
        $isaObj.filename='isa.investigation.xlsx';
        // @ts-ignore
        for (let study of $isaObj.studies) {
            study.filename = `${study.title}/isa.study.xlsx`;
            for (let assay of study.assays) {
                assay.filename = `${study.title}/isa.assay.xlsx`;
            }
            study = study;
        }
        toArc();
    }

    async function toArc() {
        const investigation = ArcInvestigation_fromJsonString(JSON.stringify($isaObj, null, 2));

        let arc = new ARC(investigation);
        arc.UpdateFileSystem();
        let contracts = arc.GetWriteContracts();

        fulfillWriteContracts(contracts);
    }

    async function fulfillWriteContracts(contracts) {
        let namespace;
        let project;

        await fetch(`${base_url}/api/v4/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${$gitlab_repsonse.access_token}`,
                'Content-Type': 'application/json'}
            }).then((resp) => {
                return resp.json();
            }).then(async (userinfo) => {
                await fetch(`${base_url}/api/v4/namespaces?search=${userinfo.username}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${$gitlab_repsonse.access_token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(async (resp) => {
                    namespace = await resp.json();
                });
            });

        await fetch(`${base_url}/api/v4/projects`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${$gitlab_repsonse.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // @ts-ignore
                "name": $isaObj.title,
                // @ts-ignore
                "namespace_id": namespace[0].id,
                "initialize_with_readme": false,
                "visibility": "private"
            })
        }).then(async (resp) => {
            project = await resp.json();
        })

        let payload = {
            "branch": "main",
            "commit_message": "Initial commit",
            "actions": []
        }

        for (const contract of contracts) {

            if (contract.Operation = "CREATE") {
                if (contract.DTO == undefined) {
                } else if (contract.DTOType == "ISA_Assay" || contract.DTOType == "ISA_Study" || contract.DTOType == "ISA_Investigation") {
                    let xlsxBytes = await Xlsx.toBytes(contract.DTO);
                    let base64String = btoa(String.fromCharCode.apply(null, xlsxBytes));
                    payload.actions.push({
                        "action": "create",
                        "file_path": contract.Path,
                        "content": base64String,
                        "encoding": "base64",
                    })
                } else if (contract.DTOType == "PlainText") {
                    payload.actions.push({
                        "action": "create",
                        "file_path": contract.Path,
                        "content": contract.DTO,
                        "encoding": "text",
                    })
                } else {
                    console.log("Warning: The given contract is not a correct ARC write contract: ", contract)
                }
            }
        }

        // @ts-ignore
        for (let study of $isaObj.studies) {
            for (let assay of study.assays) {
                for (let file of assay.dataFiles) {
                    let df = new TextEncoder().encode(new DataFrame(JSON.parse(file.comments[0].value)).toCSV(true));
                    payload.actions.push({
                        "action": "create",
                        "file_path": `assays/${study.title}/datasets/${file.name}`,
                        "content": btoa(String.fromCharCode.apply(null, df)),
                        "encoding": "base64",
                    })
                }
            }
        }

        // @ts-ignore
        await fetch(`${base_url}/api/v4/projects/${project.id}/repository/commits`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${$gitlab_repsonse.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            }).then(async (resp) => {
                console.log(await resp.json());
            });
    }
</script>

<Investigation />

{#if $gitlab_repsonse.access_token}
<div class="align-right">
    <button class="btn" on:click={publish}>Publish on DataHub</button>
</div>
{/if}

<style>
    .align-right {
        display: flex;
        justify-content: flex-end;
    }    
</style>