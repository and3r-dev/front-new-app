import { Component, OnInit } from '@angular/core';
import { Process } from '../../../models/process';
import { ProcessService } from '../../../process/process.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  cadastro: boolean = false;
  process_id: number;
  processEdit: any;
  processPaginate: any[];
  process: Process[];
  pages: any;

  constructor(
    private processService: ProcessService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getProcess();
  }

  getProcess() {
    this.processService.getProcess().subscribe((res) => {
      this.processPaginate = res;
      this.process = res._embedded.processDTOIndexList;
      this.pages = res._links;
    })
  }

  getProcessPerPage(page: number) {
    let data = new HttpParams()
    .set("page", page);

    this.processService.getProcessPerPage(data).subscribe((res) => {
      this.processPaginate = res;
      this.process = res._embedded.processDTOIndexList;
      this.pages = res._links;
    })
  }

  openVisualizar(process_id: number) {
    this.router.navigateByUrl('/processo/'+process_id);
  }

  openEditar(process: any) {
    // this.process_id = process_id;
    this.processEdit = process;
    this.cadastro = true;
  }

  openModalCadastrar() {
    this.cadastro = true;
  }

  onModalClose() {
    this.cadastro = false;
  }

  changePage(tipo: string) {
    let numberPage = null;
    if (tipo == 'next') {
      numberPage = this.pages.next.href;
    } else {
      numberPage = this.pages.previous.href;
    }
    let data = numberPage.substring(numberPage.indexOf('=') + 1, numberPage.indexOf('=') + 2);
    this.getProcessPerPage(data);
  }

  delete(process_id: number) {
    this.processService.deleteProcess(process_id).subscribe((res) => {
      if(res) {
        Swal.fire({
          title: "Processo",
          text: 'Deletado com sucesso!',
          icon: "success",
        });
        this.process.forEach((process, index) => {
          if (process.id == process_id) {
            this.process.splice(index, 1);
          }
        })
      } else {
        Swal.fire({
          title: "Processo",
          text: "Processo não foi deletado.",
          icon: "error",
        });
      }
    });
  }

}
