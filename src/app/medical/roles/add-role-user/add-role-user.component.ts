import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss']
})
export class AddRoleUserComponent {
    sideBar:any = [];
    name:string = '';
    permissions:any = [];
    valid_form:boolean = false;

    constructor(
      public DataService: DataService,
      public RoleService: RolesService,
    ){

    }
    ngOnInit(): void {
      this.sideBar = this.DataService.sideBar[0].menu;
    }

    addPermission(subMenu:any){
      if(subMenu.permision){
        const index = this.permissions.findIndex((item:any) => item == subMenu.permision);
        if(index != -1){
            this.permissions.splice(index,1 );
        }else{
            this.permissions.push(subMenu.permision);
        }
        console.log(this.permissions);
      }
    }

    save(){
      this.valid_form = false;

      if(!this.name || this.permissions.length == 0){
        this.valid_form = true;
        return;
      }
      let data = {
        name: this.name,
        permisions: this.permissions,
      };
      console.log("enviando");
      this.RoleService.storeRoles(data).subscribe((resp:any) =>{
        console.log(resp);
      });
    }
}
