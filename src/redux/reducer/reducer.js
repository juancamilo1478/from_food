import { DETAIL_ID, DIETS, FILTERS, GET_CARDS, ORDER, RESET, SEARCH_CARDS } from "../actions/actions";


const initialState={
    cards:[],
    memorie:[],
    diets:[],
    detail:[]
}
const paginado=(data)=>{
  const tamaño = 9;
  let newarray = [];
    for (var i = 0; i < data.length; i += tamaño) {
      const oneDate = data.slice(i, i + tamaño);
      newarray.push(oneDate);
    }
    return newarray
}




const rootReducer=(state=initialState ,{type,payload})=>{
    switch (type) {
        case GET_CARDS:
            return {...state,
                cards:payload,
                memorie:payload
            }
        case SEARCH_CARDS:
            return{
                ...state,
                cards:payload
            }
        case ORDER:
            return{
                ...state,
                cards:payload
            }
        case DIETS:
            return{
                ...state,
                diets:payload
            }
        case FILTERS:
            const cartas=state.cards.flat();
         let newdata_filter = cartas.filter((data) => {
       return data.diets.includes(payload) === true;
     });
     newdata_filter=paginado(newdata_filter)

            return{
                ...state,
                cards:newdata_filter
            }

        case RESET:
            return{
                ...state,
                cards:state.memorie
            }

        case DETAIL_ID:
            return{
                ...state,
                detail:payload
            }


        default:
            return{...state}
           
    }
}


export default rootReducer;