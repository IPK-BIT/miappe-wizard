// @ts-expect-error – @fslab/fsspreadsheet does not declare types
import { Xlsx } from '@fslab/fsspreadsheet';
import { ARC, JsonController } from '@nfdi4plants/arctrl';
import { downloadZip } from 'client-zip';

export async function convertIsaJsonToArc(data: any) {
	let investigation = JsonController.Investigation.fromISAJsonString(JSON.stringify(data));

	let arc = ARC.fromArcInvestigation(investigation);

	let contracts = arc.GetWriteContracts();

	const filesInZip = await fulfillWriteContract(contracts);
	const blob = await downloadZip(filesInZip).blob();

	return blob;
}

async function fulfillWriteContract(contracts: any) {
	let filesInZip = [];
	for (const contract of contracts) {
		if (contract.Operation === 'CREATE' && contract.DTO !== undefined) {
			if (contract.DTOType === 'PlainText') {
				continue;
			} else if (
				contract.DTOType === 'ISA_Assay' ||
				contract.DTOType === 'ISA_Study' ||
				contract.DTOType === 'ISA_Investigation'
			) {
				let xlsxBytes = await Xlsx.toBytes(contract.DTO);

				filesInZip.push({
					name: contract.Path,
					lastModified: new Date(),
					input: xlsxBytes
				});
			} else {
				console.log('Warning: The given contract is not a correct ARC write contract: ', contract);
				return [];
			}
		}
	}
	return filesInZip;
}
