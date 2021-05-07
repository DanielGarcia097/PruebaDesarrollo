import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user-interface';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public errorFormat = false;
  public errroSize = false;
  public success = false;
  public url = "";

  loadForm!: FormGroup;

  constructor(private authService: AuthService, private apiService: ApiService, private formBuilder: FormBuilder) { 
    this.errorFormat = false;
    this.errroSize = false;
    this.success = false;
    this.url = "";

  }

  public user:UserInterface = {
  };

  ngOnInit() {

    this.onLoginApi();

    this.loadForm = this.formBuilder.group({
      curriculum : ['']
    })

  }


  onLoginApi(): void {
    this.apiService.getPerfil()
    .subscribe(user => {
      this.user = user;
    });
  }

  selectFile(fileCv: Event){
    let file = (<HTMLInputElement>fileCv.target).files![0];
    if(file.type == "application/pdf"){
      this.errorFormat = false;
      if(file.size <= 5000000){
        this.errroSize = false;
        this.loadForm.get('curriculum')?.setValue(file);
      }else{
        this.errroSize = true;
      }
    }else{
      this.errorFormat = true;
    }
  }

  loadFile(fileCv: Event):void{

    var formData: any = new FormData();
    formData.append("curriculum", this.loadForm.get('curriculum')?.value);

    this.apiService.loadFile(formData)
    .subscribe( (res: { url_cv: any; }) => {
        this.success = true;
        this.url = res.url_cv;
      },
      (error: any) => console.log(error)
    );
  }



}
