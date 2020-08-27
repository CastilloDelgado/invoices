import { alertActions } from '../../Alert';
import { xmlConstants, xmlService, options, parser, columns} from '.';

export const xmlActions = {
  showXML,
  clearXML,
}

function showXML(files){
  return dispatch => {
    const xmls = files;
    dispatch(show());

    function arrayBufferToString(arrayBuffer, decoderType = 'utf-8') {
      let decoder = new TextDecoder(decoderType);
      return decoder.decode(arrayBuffer);
    }

    let strings = []
    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      })
    }

    async function processFile(file) {
      try {
        let xmlToJson = [];
        for(let i=0; i<file.length; i++){
          let arrayBuffer = await readFileAsync(file[i]);
          xmlToJson[i] = parser.parse(arrayBufferToString(arrayBuffer.slice(0)), options);
        }
        dispatch(request(xmlToJson));
        dispatch(success(xmlToJson));
      }
      catch (err) {
        console.log(err);
      }
    }

    processFile(xmls);
  }
  function show(){ return { type: xmlConstants.XML_SHOW, files} }
  function request(strings){ return {type: xmlConstants.XML_SHOW_REQUEST , strings } }
  function success(strings){ return { type: xmlConstants.XML_SHOW_SUCCESS, strings } }
};

function clearXML(){
  return dispatch => {
    dispatch(clear());
  }
  function clear(){ return { type: xmlConstants.XML_SHOW_CLEAR } }
};
