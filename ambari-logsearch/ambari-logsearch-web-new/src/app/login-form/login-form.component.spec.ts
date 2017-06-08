/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientService} from '@app/services/http-client.service';

import {LoginFormComponent} from './login-form.component';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let authMock = {
    isError: false
  };
  const httpClient = {
    isAuthorized: true,
    post: () => {
      return {
        finally: (callback: () => void) => {
          callback();
          return {
            subscribe: (success: () => void, error: () => void) => {
              authMock.isError ? error() : success();
            }
          }
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        HttpModule,
        FormsModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [Http]
        })
      ],
      providers: [
        {
          provide: HttpClientService,
          useValue: httpClient
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('#login()', () => {
    const cases = [
      {
        isError: true,
        isLoginAlertDisplayed: true,
        isAuthorized: false,
        title: 'login failure'
      },
      {
        isError: false,
        isLoginAlertDisplayed: false,
        isAuthorized: true,
        title: 'login success'
      }
    ];

    cases.forEach(test => {
      describe(test.title, () => {
        beforeEach(() => {
          authMock.isError = test.isError;
          component.login();
        });

        it('isLoginAlertDisplayed', () => {
          expect(component.isLoginAlertDisplayed).toEqual(test.isLoginAlertDisplayed);
        });

        it('isRequestInProgress', () => {
          expect(component.isRequestInProgress).toEqual(false);
        })
      });
    });

  });
});
