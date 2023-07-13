import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    // ...
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // ...

    const showSuccessMessage = this.route.snapshot?.root?.queryParams?.['state']?.registroExitoso;
    if (showSuccessMessage) {
      console.log('Registro exitoso');
      // Aquí puedes mostrar el mensaje en el HTML o realizar alguna otra acción.
    }
  }

}
