import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NxWelcomeComponent } from "./nx-welcome.component";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";

const NbItems = [
  NbIconModule,
  NbEvaIconsModule,
  NbLayoutModule,
  NbSidebarModule.forRoot(),
  NbButtonModule,
  NbToastrModule.forRoot()
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NxWelcomeComponent,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }), // or default | dark
    NbItems,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: 'Environment', useValue: environment },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
