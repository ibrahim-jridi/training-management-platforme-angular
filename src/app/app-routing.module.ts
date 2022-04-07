import { FormationListComponent } from './_formations/formation-list/formation-list.component';
import { CreateFormationComponent } from './_formations/create-formation/create-formation.component';
import { UpdateFormationComponent } from './_formations/update-formation/update-formation.component';
import { FormationDetailsComponent } from './_formations/formation-details/formation-details.component';
import { ThemeListComponent } from './_themes/theme-list/theme-list.component';
import { CreateThemeComponent } from './_themes/create-theme/create-theme.component';
import { UpdateThemeComponent } from './_themes/update-theme/update-theme.component';
import { ThemeDetailsComponent } from './_themes/theme-details/theme-details.component';
import { FormatterDetailsComponent } from './formatter-details/formatter-details.component';
import { UpdateFormatterComponent } from './update-formatter/update-formatter.component';
import { CreateFormatterComponent } from './create-formatter/create-formatter.component';
import { FormatterListComponent } from './formatter-list/formatter-list.component';
// import { RequestResetComponent } from './request-reset/request-reset.component';
import { FormatterComponent } from './formatter/formatter.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
// import { ResponseResetComponent } from './response-reset/response-reset.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'formatter', component: FormatterComponent ,  canActivate:[AuthGuard], data:{roles:['Formatter']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  // { path: 'request-reset-password',component: RequestResetComponent},
  // { path: 'response-reset-password/:token', component: ResponseResetComponent},
  // ! Gérer formatteur
  {path: 'admin/formatter-list', component: FormatterListComponent},
  {path: 'home/formatter-list', component: FormatterListComponent},
  {path: 'home/theme-list/formatter-list', component: FormatterListComponent},
  {path: 'home/formatter-list/theme-list/formatter-list', component: FormatterListComponent},
  {path: 'admin/formatter-list', component: FormatterListComponent},
  {path: 'admin/theme-list/formatter-list', component: FormatterListComponent},
  {path: 'admin/formatter-list/theme-list/formatter-list', component: FormatterListComponent},
  {path: 'admin/create-formatter', component: CreateFormatterComponent},
  {path: 'admin/formatter-list/create-formatter', component: CreateFormatterComponent},
  //{path: '', redirectTo: 'admin/formatter-list', pathMatch: 'full'},
  {path: 'admin/update-formatter/:id', component: UpdateFormatterComponent},
  {path: 'admin/update-formatter/:id/formatter-list', component: UpdateFormatterComponent},
  {path: 'admin/formatter-details/:id', component: FormatterDetailsComponent},
  {path: 'admin/formatter-details/:id/formatter-list', component: FormatterDetailsComponent},
  // ! Gérer themes
  {path: 'admin/theme-list', component: ThemeListComponent},
  {path: 'home/theme-list', component: ThemeListComponent},
  {path: 'home/formatter-list/theme-list', component: ThemeListComponent},
  {path: 'home/theme-list/formatter-list/theme-list', component: ThemeListComponent},
  {path: 'admin/theme-list', component: ThemeListComponent},
  {path: 'admin/formatter-list/theme-list', component: ThemeListComponent},
  {path: 'admin/theme-list/formatter-list/theme-list', component: ThemeListComponent},
  {path: 'admin/create-theme', component: CreateThemeComponent},
  {path: 'admin/theme-list/create-theme', component: CreateThemeComponent},
  {path: '', redirectTo: 'admin/theme-list', pathMatch: 'full'},
  {path: 'admin/update-theme/:id', component: UpdateThemeComponent},
  {path: 'admin/update-theme/:id/theme-list', component: UpdateThemeComponent},
  {path: 'admin/theme-details/:id', component: ThemeDetailsComponent},
  {path: 'admin/theme-details/:id/theme-list', component: ThemeDetailsComponent},
  // ! Gérer formations
  {path: 'admin/formation-list', component: FormationListComponent},
  {path: 'home/formation-list', component: FormationListComponent},
  {path: 'home/formatter-list/formation-list', component: FormationListComponent},
  {path: 'home/formation-list/formatter-list/formation-list', component: FormationListComponent},
  {path: 'admin/formation-list', component: FormationListComponent},
  {path: 'admin/formation-list/theme-list', component: FormationListComponent},
  {path: 'admin/theme-list/formation-list/theme-list', component: FormationListComponent},
  {path: 'admin/create-formation', component: CreateThemeComponent},
  {path: 'admin/formation-list/create-formation', component: CreateFormationComponent},
  {path: '', redirectTo: 'admin/formation-list', pathMatch: 'full'},
  {path: 'admin/update-formation/:id', component: UpdateFormationComponent},
  {path: 'admin/update-formation/:id/formation-list', component: UpdateFormationComponent},
  {path: 'admin/formation-details/:id', component: FormationDetailsComponent},
  {path: 'admin/formation-details/:id/formation-list', component: FormationDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
