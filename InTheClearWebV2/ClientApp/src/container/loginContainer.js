//allows retrieval from Redux
export const mapStatetoProps = state => {
    return {
        ...state.loginInfo
    }
}