import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true,
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Remove quaisquer caracteres que não sejam números
    const cleanValue = value.replace(/\D/g, '');

    // Verifica o comprimento do número e formata apropriadamente
    if (cleanValue.length === 11) {
      // Formata no padrão (xx) xxxxx-xxxx
      return cleanValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleanValue.length === 10) {
      // Formata no padrão (xx) xxxx-xxxx
      return cleanValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    // Retorna o valor original se não for um número válido
    return value;
  }
}
