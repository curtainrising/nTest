## Running locally
```
docker build -t ntestimage .
docker run --rm -p 8080:8080 --name nTestContainer ntestimage
```

## Manual Tests
- Authentication Page
  - Click on link
    - Takes you to a new page with the github auth token instructions
  - Enter no authentication and click button
    - Shows required and does not attempt to authenticate
  - Enter wrong authentication and click button
    - Removes required text
    - Takes you to Search Page
- Search Page
  - Reload
    - Uses locally stored AuthToken and shows search page
  - Delete Auth Token from github and reload
    - Takes you back to Authentication Page
  - Click on reset authentication button
    - Removes locally stored AuthToken
    - Brings you back to Authentication Page
  - Enter No text in search bar and click find button
    - Show required text and does not attempt to find the repository
  - Enter github organization
    - Removes required text
    - Shows Table of repositories
- Repository Table View
  - Enter new organization and click find
    - Shows Table of repositories for the new organization
  - Click on reset authentication button
    - Removes locally stored AuthToken
    - Brings you back to Authentication Page
  - Enter text in filter field and click button
    - Table will update with only repositories that contain the filtered text
    - Table will update in alphabetical order
  - Choose "Forks" from sort by dropdown and click button
    - Table will update with only repositories that contain the filtered text
    - Table will update in Fork descending order
  - Choose "commits to master" from sort by dropdown and click button
    - Table will update with only repositories that contain the filtered text
    - Table will update in commits descending order
  - Click on table row
      - Will take you to Commits view
- Commits View
  - Click on organization name
    - Returns to Repository Table View
  - Click on reset authentication button
    - Removes locally stored AuthToken
    - Brings you back to Authentication Page
  - Click on table row
    - Brings you to the commit in github in a separate window
