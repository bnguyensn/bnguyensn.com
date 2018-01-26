import React, {Component} from 'react';
import Header from '../00/00_Header';
import Home from './01_Home';
import About from './01_About';
import Archive from './01_Archive';
import Projects from './01_Projects';
import Contact from './01_Contact';

class Index extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.pg_dict = {
            '/': <Home />,
            '/about': <About />,
            '/archive': <Archive />,
            '/projects': <Projects />,
            '/contact': <Contact />
        };
        this.state = {
            /* Our server makes sure that only paths in pg_dict are redirected to the homepage
               i.e. we can say window.location.pathname should always be valid...for now. */
            cur_pg: this.pg_dict[window.location.pathname]
        };

        window.onpopstate = (e) => {
            if (e.state) {
                this.navigate(e.state.url)
            }
        }
    }

    navigate(target) {
        this.setState({
            cur_pg: this.pg_dict[target]
        });
    }

    render() {
        return (
            <div>
                <Header navigate={this.navigate} />
                {this.state.cur_pg}
            </div>
        )
    }
}

export default Index