export let studyHandler = {
    get(target, prop, receiver) {
        if(prop == "identifier") {
            return Reflect.get(target, "@id", receiver);
        } else if(prop == "country") {
            let license = target.comments.find((c) => c.name == "Study Country");
            return(license ? license.value : undefined);
        } else {
            return Reflect.get(target, prop, receiver);
        }
    },
    set(target, prop, value, receiver) {
        if(prop == "identifier") {
            return Reflect.set(target, "@id", value, receiver);
        } else if(prop == "country") {
            let comments = target.comments;
            let license = comments.find((c) => c.name == "Study Country");
            if(license)
                license.value = value;
            else {
                //let comment = Schemas.getObjectFromSchema("comment");
                comments.push({"@id": "", "name": "Study Country", "value": value})
            }
            return true;
        } else {
            return Reflect.set(target, prop, value, receiver);
        }
    }
}