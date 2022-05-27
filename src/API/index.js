import service from "../axios";
export function PostRecord(data) {
    return service({
        url: '/gameRecord.php',
        method: 'get',
        params: data
    })
}
export function PostContest(data) {
    return service({
        url: '/contestRecord.php',
        method: 'get',
        params: data
    })
}