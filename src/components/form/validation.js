
const regTitle = /^\S.{0,30}\S$/;


const validation = (contenido)=>{

    const errors = {};

    if (!regTitle.test(contenido.name)) {
        errors.name= 'empty title or long'; 
    }
  
    if (!contenido.image.includes("https://res.cloudinary.com/dirsusbyy/image/upload")) {
        errors.image= 'not image';
    }
    if (isNaN(contenido.level)) {
        errors.level= 'not is a number';
    }
    if(contenido.level>100||contenido.level<0)
    {
        errors.level="points not valide "
    }
    if(contenido.diet.length===0)
    {
        errors.diet="not diet"
    }
    if(contenido.pasos.length<1){
        errors.pasos="not step"
    }
    if(contenido.resumen.length<1)
    {
        errors.resumen="sumary small or null"
    }

    return errors;
}

export default validation;