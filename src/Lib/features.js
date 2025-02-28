import moment from "moment";


const fileFormat = (url = "") => {
    
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

    if (fileExt === "mp3" || fileExt === "wav")
        return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transformImage = (url = "", widht = 100) => url;

const transformImage2 = (url = "", width = 100) => {

  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`)

  return newUrl;
};

const getLast7Days = () => {

  const CurrentDate = moment();
  const Last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayData = CurrentDate.clone().subtract(i, 'days')
    
    const dayName = dayData.format('dddd');

    Last7Days.unshift(dayName);
  }
   
    return Last7Days;

};


const getOrSaveFromStroage = ({key, value, get}) => {
  if(get)
    return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key))
  : null;
  else
     localStorage.setItem(key, JSON.stringify(value))
}

export { fileFormat, transformImage ,getLast7Days, getOrSaveFromStroage, transformImage2 };
  
  


