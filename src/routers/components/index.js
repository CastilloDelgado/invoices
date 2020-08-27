
import { AgentesMainScreen } from '../../modules/Agente'
import { CuentasMainScreen } from '../../modules/Cuenta';
import { FacturaMainScreen, FacturasList, CompResponse, ImportarFacturaXML } from '../../modules/Factura';
import { ListaFacturas, HistorialFacturas } from '../../modules/Listas'
import { ImportarListaNegra } from '../../modules/ListaNegra'
import { ExportarCW, ImportarCW, MountCapture, ConceptosPendientes, ConceptosCapturados, JobsUpdate, ConceptoJob } from '../../modules/CargoWise'
import { AbonoFactura, ListarCorte } from '../../modules/CorteCaja'
import { TimbradoModule } from '../../modules/Timbrado'
import { ImportarXML } from '../../modules/CargarFacturas';
import { ImportarComplemento } from '../../modules/CargarComplementos';
import { ImportarOpinion } from '../../modules/Opinion'
import { ChangePassword } from '../../modules/Supplier/screens'
import { ReporteFactSinAut, ReporteOpinion, ReportesMainScreen } from '../../modules/Reportes/screens'
import Inicio from '../../modules/Inicio/Inicio';

export const components = {
    MountCapture: MountCapture,
    ChangePassword: ChangePassword,
    ConceptosPendientes: ConceptosPendientes,
    ConceptosCapturados: ConceptosCapturados,
    JobsUpdate: JobsUpdate,
    ConceptoJob: ConceptoJob,
    AgentesMainScreen: AgentesMainScreen,
    CuentasMainScreen: CuentasMainScreen,
    FacturaMainScreen: FacturaMainScreen,
    FacturasList: FacturasList,
    CompResponse: CompResponse,
    ListaFacturas: ListaFacturas,
    HistorialFacturas: HistorialFacturas,
    ImportarListaNegra: ImportarListaNegra,
    ExportarCW: ExportarCW,
    ImportarCW: ImportarCW,
    ImportarXML: ImportarXML,
    ImportarComplemento: ImportarComplemento,
    ImportarOpinion: ImportarOpinion,
    Inicio: Inicio,
    AbonoFactura: AbonoFactura,
    ImportarFacturaXML: ImportarFacturaXML,
    ListarCorte: ListarCorte,
    TimbradoModule: TimbradoModule,
    ReporteFactSinAut: ReporteFactSinAut,
    ReporteOpinion: ReporteOpinion,
    ReportesMainScreen: ReportesMainScreen
}

export * from './ModuleLink'
