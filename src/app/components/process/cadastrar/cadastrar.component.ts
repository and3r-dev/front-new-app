import { Component, TemplateRef, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Process } from '../../../models/process';
import { ProcessService } from '../../../process/process.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnChanges, OnInit {
  processForm!: FormGroup;
  process: Process;
  selectedFile!: File;
  dateNow: any;

  municipios: any[];
  resultMunicipios: any[];
  openListMunicipios: boolean = false;
  selectedIdMunicipio: number = 0;
  estados: any[] = [];

  modalRef?: BsModalRef;
  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  options: any[] = [];
  selectedValueMunicipio = null;
  config = {
    displayKey: "description",
    search: true
  };

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private processService: ProcessService,
    private toastr: ToastrService,
  ) {
    this.processForm = this.fb.group({
      id: [''],
      data_criacao: [''],
      data_visualizacao: [''],
      municipio: [''],
      uf: [''],
      npu: [''],
      upload_documento: ['']
    });
  }

  @Input() cadastro: boolean = false;
  @Input() processEdit: any;
  @Output() modalClose = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cadastro'] && this.cadastro) {
      this.openModal();
    }
    if (changes['processEdit'] && this.cadastro) {
      // console.log(this.process_id);
      this.processForm.get('id')?.setValue(this.processEdit.id);
      this.processForm.get('npu')?.setValue(this.processEdit.npu);
      this.processForm.get('municipio')?.setValue(this.processEdit.municipio);
      this.processForm.get('uf')?.setValue(this.processEdit.uf);
    }
  }

  ngOnInit(): void {
    this.getCidadesEstados();
    this.dateNow = new Date();
    this.dateNow = this.dateNow.toISOString().replace("T"," ").substring(0, 19);
}

  openModal() {
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  closeModal() {
    this.modalRef?.hide();
    this.modalClose.emit();
  }

  cadastrar() {
    if(this.processForm.dirty && this.processForm.valid){
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_documento', this.selectedFile.name);
      formData.append('npu', this.processForm.get('npu')?.value);
      formData.append('municipio', this.processForm.get('municipio')?.value);
      formData.append('uf', this.processForm.get('uf')?.value);
      formData.append('data_cadastro', this.dateNow);

      if (this.processForm != null) {
        formData.append('id', this.processForm.get('id')?.value);
        this.processService.putProcess(formData).subscribe({
          next: () => this.toastr.success('Atualizado com sucesso!'),
          error: (error) => {
            console.log('Error', error);
            this.toastr.error('O processo não foi atualizado.');
          },
          complete: () => console.log('Processo atualizado.')
        });
      }

      this.processService.postProcess(formData).subscribe({
        next: () => this.toastr.success('Salvo com sucesso!'),
        error: (error) => {
          console.log('Error', error);
          this.toastr.error('O processo não foi salvo.');
        },
        complete: () => console.log('Processo salvo.')
      });
    } else {
      this.toastr.error('Você precisa preencher os campos para poder salvar.');
    }
  }

  getCidadesEstados() {
    this.processService.getCidadesEstados().subscribe((res) => {
      this.municipios = res;
      this.municipios.forEach((municipio) => {
        this.estados.push(municipio.microrregiao.mesorregiao.UF);
      });
    });
  }

  searchMunicipio(nome: any) {
    let valor = nome.target.value;
    this.resultMunicipios = this.municipios.filter((municipio) => {
      return municipio?.nome?.toUpperCase()?.includes(valor.toUpperCase());
    });

    if (this.resultMunicipios.length > 0)
      this.openListMunicipios = true;
  }

  selectedMunicipio(municipio_id: number) {
    this.selectedIdMunicipio = municipio_id
    this.resultMunicipios.forEach((municipio) => {
      if (municipio.id == municipio_id) {
        this.processForm.get('municipio')?.setValue(municipio.nome);
        this.processForm.get('uf')?.setValue(municipio.microrregiao.mesorregiao.UF.nome);
        this.openListMunicipios = false;
      }
    });
  }

  selectImage(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }


}
