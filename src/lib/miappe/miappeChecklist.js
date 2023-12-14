import miappeChecklist from '@/lib/miappe/miappeChecklist.json';

const miappe = miappeChecklist.reduce((result, obj) => {
    result[obj.id] = obj;
    return result;
}, {});

export default miappe;