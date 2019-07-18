$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        $.ajax({
            url:'https://api.github.com/users/' + username,
            data:{
                client_id:'f91733ec2eadca91c8d2',
                client_secret:'d90403b05b3d52b3b44c6eaad6269334bb16f3e7'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data:{
                    client_id:'f91733ec2eadca91c8d2',
                    client_secret:'d90403b05b3d52b3b44c6eaad6269334bb16f3e7',
                    per_page: 10
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="card">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-dark">Forks: ${repo.fork_count}</span>
                                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
            <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name}</h3></div>
            <div class="card-body">
                <div class="row">
                <div class="col-md-3">
                    <img class="img-thumbnail avatar" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-success">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            <h3 class="page-header">Popular Repos</h3>
            <div id="repos"></div>
            `);
        });
    });
});