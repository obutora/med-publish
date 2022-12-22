import 'package:http/http.dart' as http;

class MedHttpHandler {
  static Future<bool> putJson(String jsonString) async {
    final Uri endpoint = Uri.parse('http://localhost:3000/medicine/updateAll');

    try {
      final response = await http.post(endpoint, body: {
        'postData': jsonString,
      });

      if (response.statusCode == 201) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw Error();
    }
  }
}
