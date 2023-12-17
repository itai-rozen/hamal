export default function Equipment() {
  return <>
  <label htmlFor="fullname">Full Name:</label>
  <input id="fullname" type="text" required />
  <label htmlFor="phone">Phone:</label>
  <input id="phone" type="phone" required />
  <label htmlFor="equipment-content">Equipment:</label>
  <textarea name="equipment-content" id="equipment-content" cols={30} rows={10} placeholder="10 XL t-shirts"></textarea>
  </>
}