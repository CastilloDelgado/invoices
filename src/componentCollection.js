import { PrivateRoute, AdminRouter, SupplierMainRouter, SupplierRoute, MainRouter } from './routers';
import { LoginPage } from './modules/User/screens';
import { SupplierLoginPage, RegisterScreen } from './modules/Supplier/screens';
import { EmpresasScreen } from './modules/Empresas/';
import { NotFound } from './modules/_custom';

export const components = {
    PrivateRoute : PrivateRoute,
    AdminRouter : AdminRouter,
    SupplierMainRouter : SupplierMainRouter,
    SupplierRoute : SupplierRoute,
    MainRouter : MainRouter,
    LoginPage : LoginPage,
    SupplierLoginPage : SupplierLoginPage,
    RegisterScreen : RegisterScreen,
    EmpresasScreen : EmpresasScreen,
    NotFound : NotFound
}