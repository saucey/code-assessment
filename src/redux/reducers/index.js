const initialState = {
  message: 'Loading...',
  href: null,
  payload: [],
  rendered: 2,
  isRendering: false
};

export default function(state = initialState, action) {

  switch(action.type) {
    case 'setLink': {
      return {
        ...state,
        message: action.link.message,
        href: action.link.href
      }
    }    

    case 'setImages': {
      return {
        ...state,
        payload: action.payload,
        rendered: state.rendered + 1
      }
    } 
    
    default:
      return state
  }
}
