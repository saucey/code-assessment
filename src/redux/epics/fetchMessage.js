import {ofType, combineEpics} from 'redux-observable'
import {timer} from 'rxjs';
import {mergeMap, map} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const setLink = link => ({ type: 'setLink', link });
const setImages = payload => ({ type: 'setImages', payload });

const epic1 = (action$, state$) =>
  action$.pipe(
    ofType('fetchInitImages'),
    mergeMap(() =>
      ajax.getJSON(`https://jsonplaceholder.typicode.com/photos`).pipe(
        map(response => setImages(response.slice(0, 2)))
      )
    ),
  );

const epic2 = (action$, state$) =>
  action$.pipe(
    ofType('fetchImages'),
    mergeMap(() =>
      ajax.getJSON(`https://jsonplaceholder.typicode.com/photos`).pipe(
        map(response => setImages(response.slice(0, state$.value.rendered + 1)))
      )
    )
  );

const rootEpic = combineEpics(epic1, epic2);

export default rootEpic;
