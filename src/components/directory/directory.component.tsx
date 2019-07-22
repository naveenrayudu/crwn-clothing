import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';
import { IDirectortItemData } from '../../models/interfaces/IItemData';
import { directorySelector } from '../../store/reducers/directory/directory.selector';
import { AppState } from '../../store/reducers/rootReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';


interface IDirectoryComponentProps {
    sections: IDirectortItemData[]
}

const  Directory :React.FC<IDirectoryComponentProps> = ({sections}) => {
    return (
        <div className="directory-menu">
            {
                sections.map((section) => {
                    return <MenuItem key={section.id} {...section}></MenuItem>
                })
            }
        </div>
    )
}


const mapStateToProps = createStructuredSelector<AppState, IDirectoryComponentProps>({
    sections: directorySelector
})

export default connect(mapStateToProps) (Directory);