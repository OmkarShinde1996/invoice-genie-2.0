const logout = (req, resp) => {
    resp.clearCookie('userRegistered')
    // resp.redirect('/')
    resp.redirect('back')
}
module.exports = logout