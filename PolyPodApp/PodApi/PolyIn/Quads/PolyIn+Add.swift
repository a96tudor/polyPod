//
//  PolyIn+Add.swift
//  PolyPod
//
//  Created by Carmen Burmeister on 17.07.20.
//  Copyright © 2020 polypoly. All rights reserved.
//

import UIKit
import CoreData

extension PolyIn {
    
    func addQuads(quads: [ExtendedData], completionHandler: (Bool) -> Void) {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
            completionHandler(false)
            return
        }
        
        let managedContext = appDelegate.persistentContainer.viewContext
        
        for quad in quads {
            let _ = createNode(for: quad, in: managedContext)
        }
        
        do {
            try managedContext.save()
            completionHandler(true)
        } catch {
            print("Could not save. \(error)")
            completionHandler(false)
        }
    }
    
    private func createNode(for extendedData: ExtendedData, in managedContext: NSManagedObjectContext) -> NSManagedObject? {
        let entityName = extendedData.classname.replacingOccurrences(of: "@polypoly-eu/rdf.", with: "")

        guard let entity = NSEntityDescription.entity(forEntityName: entityName, in: managedContext) else {
            assert(false)
        }
        
        let node = NSManagedObject(entity: entity, insertInto: managedContext)
         
        for (key, value) in extendedData.properties {
            if let childExtendedData = value as? ExtendedData {
                let childNode = createNode(for: childExtendedData, in: managedContext)
                node.setValue(childNode, forKey: key)
            } else {
                node.setValue(value, forKeyPath: key)
            }
        }
        
        return node
    }
    
}
