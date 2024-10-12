import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),  // Para habilitar o HttpClient com interceptors standalone
        provideHttpClientTesting(),  // Para habilitar o HttpClientTesting
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Adiciona o interceptor
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não existem requisições pendentes
  });

  it('should add an Authorization header', () => {
    localStorage.setItem('auth_token', 'test-token'); // Simula o token no localStorage

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header if there is no token', () => {
    localStorage.removeItem('auth_token'); // Remove o token

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
