

import * as React from 'react';

type SetCurPgFuncType = (newCurPg: string) => {};

export default function withRouterMethods(Component: React.Node,
                                          routerPath: string,
                                          setCurPg: SetCurPgFuncType) {

    return class extends React.PureComponent<{}> {
        componentDidMount() {
            setCurPg(routerPath);
        }

        render() {
            const {...props} = this.props;
            return (
                <Component {...props} />
            )
        }
    }
}
