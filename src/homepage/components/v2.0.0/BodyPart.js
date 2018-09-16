import * as React from 'react';

type SetCurPgFuncType = (newCurPg: string) => {};

export default class BodyPart extends React.PureComponent<{children: React.Node, setCurPg: SetCurPgFuncType, bodyPartPath: string}> {
    componentDidMount() {
        const {setCurPg, bodyPartPath} = this.props;
        setCurPg(bodyPartPath);
    }

    render() {
        const {children, ...props} = this.props;
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
}
