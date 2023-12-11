//import Schemas from '@/lib/schemas.js';

function simpleMapping(name, enum_key = null) {
    enum_key = enum_key || name;
    return([(o) => o[name], (o, v) => o[name] = v, enum_key]);
}

function commentMapping(name, enum_key = null) {
    enum_key = enum_key || name;
    return([
    (o) => {
        let license = o.comments.find((c) => c.name == name);
        return(license ? license.value : undefined);
    },
    (o, v) => {
        let license = o.comments.find((c) => c.name == name);
        if(license)
            license.value = v;
        else {
            //let comment = Schemas.getObjectFromSchema("comment");
            o.comments.push({"@id": "", "name": name, "value": v})
        }
    },
    enum_key
    ]);
}

export class InvestigationMapper {
    static KEYS = {};

    constructor(isaObj) {
        this.isaObj = isaObj;
    }
}
let investigation_mapping = new Map([
    ["DM-2", simpleMapping("@id", "identifier")],
    ["DM-3", simpleMapping("title")],
    ["DM-4", simpleMapping("description")],
    ["DM-5", simpleMapping("submissionDate")],
    ["DM-6", simpleMapping("publicReleaseDate")],
    ["DM-7", commentMapping("License", "license")],
    ["DM-8", commentMapping("MIAPPE version", "miappeVersion")],
    ["DM-9", simpleMapping("publications")]
]);
investigation_mapping.forEach(function(v, k, m) {
    InvestigationMapper.KEYS[v[2]] = k;
    Object.defineProperty(InvestigationMapper.prototype, k, {
        get: function() {
            return v[0](this.isaObj);
        },
        set: function(newValue) {
            v[1](this.isaObj, newValue);
        }
    });
})


export class StudyMapper {
    static KEYS = {};

    constructor(isaObj) {
        this.isaObj = isaObj;
    }
}
let study_mapping = new Map([
    ["DM-11", simpleMapping("@id", "identifier")],
    ["DM-12", simpleMapping("title")],
    ["DM-13", simpleMapping("description")],
    ["DM-14", commentMapping("Study Start Date", "startDate")],
    ["DM-15", commentMapping("Study End Date", "endDate")],
    ["DM-16", commentMapping("Study Contact Institution", "contactInstitution")],
    ["DM-17", commentMapping("Study Country", "country")],
    ["DM-18", commentMapping("Study Experimental Site", "experimentalSite")],
    ["DM-19", commentMapping("Study Latitude", "latitude")],
    ["DM-20", commentMapping("Study Longitude", "longitude")],
    ["DM-21", commentMapping("Study Altitude", "altitude")],
]);
study_mapping.forEach(function(v, k, m) {
    StudyMapper.KEYS[v[2]] = k;
    Object.defineProperty(StudyMapper.prototype, k, {
        get: function() {
            return v[0](this.isaObj);
        },
        set: function(newValue) {
            v[1](this.isaObj, newValue);
        }
    });
})



let isaObj = {
  "@id": "myId",
  "filename": "",
  "identifier": "",
  "title": "Hugoasd",
  "description": "Really nice",
  "submissionDate": "2023-12-14",
  "publicReleaseDate": "2023-12-23",
  "ontologySourceReferences": [],
  "publications": [],
  "people": [
    {
      "@id": "",
      "lastName": "Mustermann",
      "firstName": "Max",
      "midInitials": "",
      "email": "",
      "phone": "",
      "fax": "",
      "address": "Musterhausen 123",
      "affiliation": "idiot",
      "roles": [],
      "comments": []
    }
  ],
  "studies": [
    {
      "@id": "",
      "filename": "Study1",
      "identifier": "study1",
      "title": "",
      "description": "",
      "submissionDate": "",
      "publicReleaseDate": "",
      "publications": [],
      "people": [],
      "studyDesignDescriptors": [],
      "protocols": [],
      "materials": {
        "sources": [],
        "samples": [],
        "otherMaterials": []
      },
      "processSequence": [],
      "assays": [],
      "factors": [],
      "characteristicCategories": [],
      "unitCategories": [],
      "comments": []
    }
  ],
  "comments": []
}

let investigation = new InvestigationMapper(isaObj);
console.log(investigation[InvestigationMapper.KEYS.identifier]);
console.log(investigation);