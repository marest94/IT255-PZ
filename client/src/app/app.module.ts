import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RestApiService } from "./services/rest-api.service";
import { MessageService } from "./services/message.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { HomeComponent } from "./pages/home/home.component";
import { MessageComponent } from "./pages/message/message.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AddressComponent } from "./pages/address/address.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { PostProductComponent } from "./pages/post-product/post-product.component";
import { MyProductsComponent } from "./pages/my-products/my-products.component";
import { CategoryComponent } from "./pages/category/category.component";
import { ProductComponent } from "./pages/product/product.component";
import { SearchComponent } from "./pages/search/search.component";
import { CartComponent } from "./pages/cart/cart.component";
import { FooterComponent } from "./pages/common/layout/footer/footer.component";
import { HeaderComponent } from "./pages/common/layout/header/header.component";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { OrderComponent } from "./pages/order/order.component";
import { UserService } from "./services/user.service";
import { CartService } from "./services/cart.service";
import { AlgoliaService } from "./services/algolia.service";
import { ProductService } from "./services/product.service";
import { OrderService } from "./services/order.service";
import { CategoryService } from "./services/category.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    CategoriesComponent,
    PostProductComponent,
    MyProductsComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent,
    CartComponent,
    OrderComponent,
    MyOrdersComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RestApiService,
    MessageService,
    AuthGuardService,
    UserService,
    CartService,
    AlgoliaService,
    ProductService,
    OrderService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
