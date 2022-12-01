import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Question } from '../models/question.model';

export const TOTAL_QUESTIONS = 10;
const API_ENDPOINT = 'https://opentdb.com/api.php';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    // API query params
    const params = new HttpParams({
      fromObject: {
        amount: TOTAL_QUESTIONS,
        difficulty: 'easy',
        type: 'multiple',
      },
    } as HttpParamsOptions);

    // Get questions from remote API
    return this.httpClient.get(API_ENDPOINT, { params }).pipe(
      map((response: any) => {
        if (response && 'results' in response) {
          return response['results'].map((item: any) => {
            return new Question(
              uuidv4(),
              item.category,
              item.question,
              item.correct_answer,
              item.incorrect_answers
            );
          });
        } else {
          throw new Error('The response format is not correct.');
        }
      })
    );
  }
}
