const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
};

function timeAgo(timestamp) {
  const currentTime = Date.now()
  const diffTime = Math.abs(currentTime - Date.parse(timestamp))
  
  if (diffTime < 60*60*1000) return `${Math.floor(diffTime / (60*1000))}m ago`
  else if (diffTime < 24*60*60*1000) return `${Math.floor(diffTime / (60*60*1000))}h ago`
  else return `${Math.floor(diffTime / (24*60*60*1000))}d ago`
}

function viewCount(views) {
  if (views >= 1000) return `${Math.floor(views/1000)}k`
  else return views
}

function forumCategory(id) {
  let selectedCategory = {}
  if (allCategories.hasOwnProperty(id)) {
    selectedCategory.className = allCategories[id].className
    selectedCategory.category = allCategories[id].category
  }
  else {
    selectedCategory.className = "general"
    selectedCategory.category = "General"
  }

  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`
  const linkText = selectedCategory.category
  const linkClass = `category ${selectedCategory.className}`

  return `<a href="${url}" class="${linkClass}">${linkText}</a>`
}

function avatars(posters, users) {
  return posters.map((poster) => {
    const user = users.find((user) => user.id === poster.user_id)
    if (user) {
      let avatar = user.avatar_template.replace("{size}", "30")
      let userAvatarUrl = avatar.startsWith('/user_avatar/') ? `${avatarUrl}${avatar}` : `${avatar}`
      return `<img src="${userAvatarUrl}" alt="${user.name}" />`
    }
  }).join("")
}

function showLatestPosts(data) {
  let users = data.users
  let topics = data.topic_list.topics
  
  document.querySelector("#posts-container").innerHTML = topics.map((topic) => {
    let {id, title, views, posts_count, slug, posters, category_id, bumped_at} = topic
    return `
      <tr>
        <td>
          <a href="${forumTopicUrl}${slug}/${id}" class="post-title">${title}</a>
          ${forumCategory(category_id)}
        </td>
        <td>
          <div class="avatar-container">${avatars(posters, users)}</div>
        </td>
        <td>${posts_count - 1}</td>
        <td>${viewCount(views)}</td>
        <td>${timeAgo(bumped_at)}</td>
      </tr>
    `
  }).join("")
}

async function fetchData() {
  try {
    const res = await fetch(forumLatest)
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
    const forumData = await res.json()
    showLatestPosts(forumData)
  } catch (e) {
    console.log(e)
  }
}

fetchData()