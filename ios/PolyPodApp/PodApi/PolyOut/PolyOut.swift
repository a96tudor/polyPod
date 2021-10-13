import Foundation

protocol PolyOutProtocol {
    func fetch(urlString: String, requestInit: FetchRequestInit, completionHandler: @escaping (FetchResponse?, Error?) -> Void)
    func stat(url: String, completionHandler: @escaping (FileStats?, Error?) -> Void)
    func fileRead(url: String, options: [String: Any], completionHandler: @escaping (Any?, Error?) -> Void)
    func fileWrite(url: String, data: String, completionHandler: @escaping (Error?) -> Void)
    func readdir(url: String, completionHandler: @escaping ([String]?, Error?) -> Void)
}

class PolyOut: PolyOutProtocol {
    let session: NetworkSession
    
    init(session: NetworkSession = URLSession.shared) {
        self.session = session
    }
}
