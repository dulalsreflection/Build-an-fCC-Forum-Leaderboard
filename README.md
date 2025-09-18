<h1 style="text-align: center;">Build an fCC Forum Leaderboard <svg xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="Passed" height="15" viewBox="0 0 200 200" width="15" xmlns="http://www.w3.org/2000/svg"><g aria-hidden="true"><title>Passed</title><circle cx="100" cy="99" fill="#FFFFFF" r="95" stroke="#FFFFFF" stroke-dasharray="null"></circle><rect fill="#0A0A23" height="30" stroke="#0A0A23" stroke-dasharray="null" transform="rotate(-45, 120, 106.321)" width="128.85878" x="55.57059" y="91.32089"></rect><rect fill="#0A0A23" height="30" stroke="#0A0A23" stroke-dasharray="null" transform="rotate(45, 66.75, 123.75)" width="80.66548" x="26.41726" y="108.75"></rect></g></svg></h1>

Build an app that is functionally similar to this example project. Try not to copy the example project, give it your own personal style.

In this lab, you will build a freeCodeCamp forum leaderboard that displays the latest topics, users, and replies from the [freeCodeCamp forum](https://forum.freecodecamp.org/). The HTML, CSS and part of the JS have been provided for you. Feel free to explore them.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a function named `timeAgo` that takes a timestamp in the ISO 8601 format as the argument.
2. The `timeAgo` function should compute the time difference between the time passed as an argument and the current time and return:
    * `xm ago` (`x` represents minutes) if the amount of minutes that have passed is less than `60`.
    * `xh ago` (`x` represents hours) if the amount of hours that have passed is less than `24`.
    * `xd ago` (`x` represents days) otherwise.
3. You should have a function named `viewCount` that takes the number of views of a post as the argument.
4. If the value of the views passed as the argument is greater than or equal to `1000`, the `viewCount` function should return a string with the views value divided by `1000`, rounded down to the nearest whole number and the letter `k` appended to it. Otherwise, it should return the views value.
5. You should have a function named `forumCategory` that takes the id of a selected category as the argument.
6. The `forumCategory` function should verify that the selected category id is a property of the `allCategories` object and should return a string containing an anchor element with:
    * the text of the `category` key of the selected category.
    * a class of `category` followed by the `className` property of the selected category.
    * an `href` with the value of `<forumCategoryUrl>/<className>/<id>`, where `<className>` is the `className` property of the selected category and `id` is the argument passed to `forumCategory`.
7. If the `allCategories` object does not have the selected category id as its property, `category` should be indicated as `General` and `className` should be indicated as `general`.
8. You should have a function named `avatars` that takes two arrays representing posters and users, respectively.
9. The `avatars` function should return a string made by joining `img` elements, one for each `user_id` in the `posters` array. Find the `img` URL by looking up the `user_id` property in the `posters` array and find the matching `id` property in the `users` array.
10. The `avatars` function should set each avatar's size by accessing the `avatar_template` property and replacing `{size}` with `30`.
11. Each image element should have an alt text with the value of the `name` property of the poster.
12. Each image element should have a source with the value of the `avatar_template` property of the poster. In case `avatar_template` contains a relative path, you should set the source to `<avatarUrl>/<avatar_template>`.
13. You should have a function named `showLatestPosts` that takes a single parameter.
14. The `showLatestPosts` should extract the `users` and `topic_list` properties from the object passed as argument. Also, it should process the following properties of the objects from the `topics` array, which is contained in `topic_list`:
    * `id`: the id of the post
    * `title`: the title of the post
    * `views`: the number of views of the post
    * `posts_count`: the number of replies to the topic
    * `slug`: the slug of the post
    * `posters`: the posters for that topic
    * `category_id`: an integer indicating the category id for the post
    * `bumped_at`: a timestamp in the ISO 8601 format
15. The `showLatestPosts` should set the inner HTML of `#posts-container` to a string made by joining `tr` elements, one for each item in `topics`.
16. Each `tr` element should have five `td` elements in it:
    * a `td` containing two anchor elements, one with the class of `post-title`, an `href` of `<forumTopicUrl><slug>/<id>`, an anchor text of `<title>`, and one obtained by calling `forumCategory` with `category_id`.
    * a `td` containing a `div` element with class `avatar-container` that contains the images returned by the `avatars` function called with `posters` and `users` as arguments.
    * a `td` containing the number of replies to the post. _Hint:_ use `posts_count - 1`.
    * a `td` containing the number of views of the post.
    * a `td` containing the time passed since the last activity.
17. You should have an async function named `fetchData`.
18. The `fetchData` function should request data from `forumLatest` and call `showLatestPosts` passing it the response parsed as JSON.
19. If there's an error when fetching data, the `fetchData` function should log the error to the console. You should specifically use `console.log` for this.