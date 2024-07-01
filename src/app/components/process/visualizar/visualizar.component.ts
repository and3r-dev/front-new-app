import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessService } from '../../../process/process.service';
import { Process } from '../../../models/process';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.css'
})
export class VisualizarComponent implements OnInit {
  process_id: any;
  process: any;

  constructor(
    private route: ActivatedRoute,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {
    this.process_id = this.route.snapshot.paramMap.get('id');
    this.getProcessById();
  }

  getProcessById() {
    this.processService.getProcessById(this.process_id).subscribe((res) => {
      this.process = res;
    });
  }

}
