export const resizeAndSetPhoto = (reader, setValue, sizeX, sizeY) => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = sizeX;
        canvas.height = sizeY;
        ctx.drawImage(img, 0, 0, sizeX, sizeY);
        const resizedAvatar = canvas.toDataURL('image/jpeg');
        setValue(resizedAvatar);
    };
};

export const fileNameFromUrl = (url) => {
    if(url){
        try{
            const lastSlashIndex = url.lastIndexOf("/");
            const lastDotIndex = url.lastIndexOf(".");
            const fileNameWithoutExtension = url.substring(lastSlashIndex + 1, lastDotIndex+4);
            return "Name of encoded lastly uploaded file: " + fileNameWithoutExtension;
        }catch(error){
            return '';
        }
    }else{
        return ""
    }
    
    
};