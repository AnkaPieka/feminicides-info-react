import React from 'react'


class SearchBar extends React.Component {

    handleChange = (event) => {
        let inputName = event.target.value;
        this.props.searchByName(inputName)
    }
    render(){
    return (
        <div>
            <form>
                <input 
                onChange={this.handleChange}
                type="text"
                placeholder="Rechercher par prénom"
                />
            </form>
            
        </div>
    )
    }
}

export default SearchBar;
