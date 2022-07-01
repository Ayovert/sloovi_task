export const formatDate = (date:Date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('/');
  }


  export function getTime(time:number){
    let hours : any = Math.floor(time / 3600).toString().padStart(2, '0');
    let minutes : any = Math.floor((time - (hours * 3600)) / 60).toString().padStart(2, '0');
    let seconds : any = (time - (hours * 3600) - (minutes * 60)).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
    }