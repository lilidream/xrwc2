import service from "../axios";
export function PostRecord(data) {
    return service({
        url: '/gameRecord.php',
        method: 'post',
        params: data
    })
}