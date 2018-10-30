import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
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

import { AuthGuardService } from "./services/auth-guard.service";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { OrderComponent } from "./pages/order/order.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "search",
    component: SearchComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "categories/:id",
    component: CategoryComponent
  },
  {
    path: "product/:id",
    component: ProductComponent
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/settings",
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/address",
    component: AddressComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/postproduct",
    component: PostProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/myproducts",
    component: MyProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/orders",
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile/orders/:id",
    component: OrderComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
