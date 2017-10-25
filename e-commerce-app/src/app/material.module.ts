import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatInputModule,
  MatListModule,
  MatExpansionModule,
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule, MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
