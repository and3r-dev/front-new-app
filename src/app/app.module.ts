import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastrarComponent } from './components/process/cadastrar/cadastrar.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisualizarComponent } from './components/process/visualizar/visualizar.component';
import { InicioComponent } from './components/process/inicio/inicio.component';

const maskConfig: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    VisualizarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SelectDropDownModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration(),
    provideEnvironmentNgxMask(maskConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
