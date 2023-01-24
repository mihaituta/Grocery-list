# Grocery list
A **grocery shopping** application I made to **learn react** and to use for myself when I go shopping.

<a href="https://shopping-mt.netlify.app" rel="noreferrer" target="_blank">Live demo</a>

**Demo** account **demo@gmail.com**, password: **123123**


# Technologies
- **React.js**
- **HTML**
- **CSS**
- **JavaScript**
- **Tailwind CSS**
- **Firebase**
- Hosted on **Netlify**

# Functionalities
Users have to create an account to have their data saved in the database.

The app has **2 main pages:**
- **Home**:
  - Here users can **create** and **see** their grocery lists.
  - New lists appear at the top and their date can be seen, the **date is first set** when the list is created, then it is only **changed once the first time the list is completed (all items are checked).**
  - The list also has a preview of what items it contains and if they are checked or not (like the notes app on Windows).
- **List's page**:
  - Here users can **see** the entire list.
  - The lists can be **deleted.**
  - It contains a **total price input** where the user can type the total price manually, or it is calculated automatically when all the items have a price and are checked.
  - There is a **prices toggle checkbox** that toggles on/off the items with empty prices (leave only the prices of the items that are set for visibility).
  - It also has a **percentage bar and a out of (ex. 5/10)** functionality to keep track of how many items are left in the list and when it is completed.
  - **Food Items** can be:
    - **Checked/unchecked**
    - **Deleted**
    - **Reordered** 
    - Have their **price added/edited.**
  
The last functionality and my favorite is when items are added to the lists they are saved on the users account in the database so that the next time the user starts typing the same item's name it will be recommended/autofilled as a chip to be clicked and added automatically to the list, this saves time since people usually buy lots of the same groceries every time they shop or every other shopping, so after few weeks or months of shopping the user will have a lot of food items saved in their account and lists will take very short time to be created since almost all the items they want will be recommended/autofilled by the app as they type.

# Installation

Project setup:
```
npm install
```
Start local server:
```
npm start
```

## Contact
**tutamihai@gmail.com**
