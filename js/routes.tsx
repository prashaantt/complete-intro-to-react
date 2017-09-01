import * as React from 'react'
import preload = require('../public/data.json');
import { AsyncRoute, AsyncRouteProps } from "./AsyncRoute";
import { Show, DetailsProps } from "./Details";
import { RouteComponentProps } from "react-router";
import { SearchProps } from './Search';

interface ShowsData {
    shows: Show[];
}

const data = preload as ShowsData;

export interface RouterParams {
    id: string;
}

type ReactConstructor<P = any, S = any> = new (props: P) => React.Component<P, S>;

const AsyncDetails: ReactConstructor<AsyncRouteProps<DetailsProps>> = AsyncRoute;

const AsyncLanding: ReactConstructor<AsyncRouteProps> = AsyncRoute;

const AsyncSearch: ReactConstructor<AsyncRouteProps<SearchProps>> = AsyncRoute;

interface RouteConfig<T = any> {
    component: React.ComponentType<T> | React.ReactElement<any>;
    path: string;
    exact?: boolean;
    routes?: RouteConfig<T>[];
}

export const routes: RouteConfig<RouteComponentProps<RouterParams>>[] = [
    {
        path: '/',
        exact: true,
        component: (props) =>
            <AsyncLanding
                props={ props }
                loadingPromise={ import('./Landing') }
            />
    },
    {
        path: '/search',
        component: (props) =>
            <AsyncSearch
                props={ { ...{ shows: data.shows } } }
                loadingPromise={ import('./Search') }
            />
    },
    {
        path: '/details/:id',
        component: (props) => {
            const shows = data.shows.filter((show: Show) => props.match.params.id === show.imdbID)
            return (
                <AsyncDetails
                    props={ { ...{ show: data.shows[0] } } }
                    loadingPromise={ import('./Details') }
                />
            )
        }
    }
]
