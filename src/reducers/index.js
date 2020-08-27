import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { factura } from './factura.reducer';
import { empresas } from './empresas.reducer';
import { sheet } from './sheet.reducer';
import { agente } from './agente.reducer';
import { cuenta } from './cuenta.reducer';
import { supplier } from './supplier.reducer';
import { proveedores } from './proveedores.reducer';
import { cargarComplementos } from './cargarComplementos.reducer';
import { opinion } from './opinion.reducer';
import { listaNegra } from './listaNegra.reducer';
import { listas } from './listas.reducer';
import { cw } from './cw.reducer'
import { corte } from './corte.reducer';
import { config } from './config.reducer';
import { reporte } from './reporte.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  empresas,
  sheet,
  agente,
  cuenta,
  factura,
  supplier,
  proveedores,
  cargarComplementos,
  opinion,
  listaNegra,
  listas,
  cw,
  corte,
  config,
  reporte
});

export default rootReducer;
