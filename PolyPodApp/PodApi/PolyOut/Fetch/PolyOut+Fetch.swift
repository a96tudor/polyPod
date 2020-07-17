//
//  PolyOut+Fetch.swift
//  PolyPod
//
//  Created by Carmen Burmeister on 17.07.20.
//  Copyright © 2020 polypoly. All rights reserved.
//

import Foundation

extension PolyOut {
    
    func fetch(urlString: String, requestInit: FetchRequestInit, completionHandler: @escaping (FetchResponse?, Error?) -> Void) {
        guard let url = URL(string: urlString) else {
            completionHandler(nil, PolyApiError.paramterMissing)
            return
        }

        let method = requestInit.method ?? "GET"
        
        var request = URLRequest(url: url)
        request.httpMethod = method.uppercased()
        
        //request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        /*
        if let headers = initData["headers"] as? [String: String] {
            for (key, value) in headers {
                request.setValue(value, forHTTPHeaderField: key)
            }
        }
        */
        if let body = requestInit.body, body.count > 0 {
            let postString = body
            request.httpBody = postString.data(using: .utf8)
        }
        
        session.loadData(with: request, completionHandler: { (data, response, error) in
            if let error = error {
                completionHandler(nil, error)
                return
            }
            guard let httpResponse = response as? HTTPURLResponse else {
                completionHandler(nil, PolyApiError.unknown)
                return
            }
            
            let fetchResponse = FetchResponse(response: httpResponse, data: data)
            
            completionHandler(fetchResponse, nil)
        })
    }
    
}
