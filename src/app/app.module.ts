import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { FormatterComponent } from './formatter/formatter.component';
// import { RequestResetComponent } from './request-reset/request-reset.component';
// import { ResponseResetComponent } from './response-reset/response-reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CreateFormatterComponent } from './create-formatter/create-formatter.component';
import { FormatterDetailsComponent } from './formatter-details/formatter-details.component';

import { FormatterListComponent } from './formatter-list/formatter-list.component';
import { UpdateFormatterComponent } from './update-formatter/update-formatter.component';
import { AdHeaderComponent } from './ad-header/ad-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CreateThemeComponent } from './_themes/create-theme/create-theme.component';
import { ThemeDetailsComponent } from './_themes/theme-details/theme-details.component';
import { ThemeListComponent } from './_themes/theme-list/theme-list.component';
import { UpdateThemeComponent } from './_themes/update-theme/update-theme.component';
import { CreateFormationComponent } from './_formations/create-formation/create-formation.component';
import { UpdateFormationComponent } from './_formations/update-formation/update-formation.component';
import { FormationListComponent } from './_formations/formation-list/formation-list.component';
import { FormationDetailsComponent } from './_formations/formation-details/formation-details.component';
import { FilterPipe } from './_pipe/filter.pipe';
import { HighlightDirective } from './_pipe/highlight.directive';
import { AdProfileComponent } from './ad-profile/ad-profile/ad-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    FormatterComponent,
    // RequestResetComponent,
    // ResponseResetComponent,

    CreateFormatterComponent,
    FormatterDetailsComponent,
    FormatterListComponent,
    UpdateFormatterComponent,
    AdHeaderComponent,
    SidenavComponent,
    CreateThemeComponent,
    ThemeDetailsComponent,
    ThemeListComponent,
    UpdateThemeComponent,
    CreateFormationComponent,
    UpdateFormationComponent,
    FormationListComponent,
    FormationDetailsComponent,
    FilterPipe,
    HighlightDirective,
    AdProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
	// * SMART-TABLE
	Ng2SmartTableModule,
  ],


  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
